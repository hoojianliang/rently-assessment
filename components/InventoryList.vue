<template>
  <div class="col-span-2">
    <h2><b>Inventory List - {{ selectedApartmentLabel }}</b></h2>
    <div class="bg-base-100 shadow-xl">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="inventoryData.length" :class="{ hover: selectedApartment }" v-for="(item, key) in inventoryData">
              <th>{{ key + 1 }}</th>
              <td>{{ findItem(item) }}</td>
              <td>
                <select class="select select-bordered w-full max-w-xs" :disabled="selectedApartment === 0"
                  @change="amountChange($event)" v-model="item.Amount">
                  <option value="0">{{ 0 }}</option>
                  <template v-for="index in balance + item.Amount">
                    <option :value="index">{{ index }}</option>
                  </template>
                </select>
              </td>
            </tr>
            <!-- Dummy UI when apartment not select -->
            <tr v-else :class="{ hover: selectedApartment }" v-for="(item, key) in itemLookup">
              <th>{{ key + 1 }}</th>
              <td>{{ item.Value }}</td>
              <td>
                <select class="select select-bordered w-full max-w-xs" :disabled="selectedApartment === 0">
                  <option value="0" selected>0</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="m-4">
          <ApproveModal :selected-apartment="selectedApartment" :selected-apartment-label="selectedApartmentLabel" :inventory-data="inventoryData" :count="count" :find-item="findItem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  props: {
    selectedApartment: {
      type: Number,
      default: 0
    },
    selectedApartmentLabel: {
      type: String,
      default: ""
    }
  },
  async setup(props) {
    interface inventoryProps {
      data: [],
      count: number
    }

    interface inventoryDataProps {
      ID: number,
      Item: string,
      ApartmentID: number,
      Amount: number
    }

    interface itemProps {
      Key: string,
      Value: string,
    }

    const maxCount = 20
    const count = ref(0)
    const balance = ref(0)
    const inventoryData = ref<inventoryDataProps[]>([])
    const { data: itemLookup } = await useFetch('/api/itemlookup')

    async function getInventory(apartmentId: number) {
      const { data } = await useFetch<inventoryProps | null>('/api/inventory/' + apartmentId)
      count.value = data.value ? data.value.count : 0
      balance.value = maxCount - (data.value ? data.value.count : 0)
      inventoryData.value = data.value ? data.value.data : []
    }

    const amountChange = (e: Event) => {
      const val = (e.target as HTMLInputElement).value
      const sum = inventoryData.value.reduce((total, row) => {
        return total + row.Amount
      }, 0)
      count.value = sum
      balance.value = maxCount - sum
    }

    const getInventoryItemAmount = (key: string) => {
      const item = inventoryData.value.find((data: inventoryDataProps) => {
        return data.Item === key
      })
      return item ? item.Amount : 0
    }

    const findItem = (item: inventoryDataProps) => {
      return itemLookup.value.find((res: itemProps) => { return res.Key === item.Item }).Value
    }

    watch(() => props.selectedApartment, (val) => {
      getInventory(val)
    });

    return {
      count,
      balance,
      inventoryData,
      itemLookup,
      amountChange,
      getInventoryItemAmount,
      findItem
    }
  },
}
</script>