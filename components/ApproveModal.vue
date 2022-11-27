<template>
  <!-- The button to open modal -->
  <label for="approve-modal" class="btn" :class="{ 'btn-disabled': selectedApartment === 0 }">Preview</label>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="approve-modal" class="modal-toggle" />
  <label for="approve-modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <label for="approve-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h3 class="mt-4 font-bold text-lg">Inventory List Preview - {{ selectedApartmentLabel }}</h3>
      <div class="overflow-x-auto mt-4">
        <table class="table w-full">
          <tbody>
            <tr v-for="inventory in inventoryData">
              <td>{{ findItem?.(inventory) }}</td>
              <td>x</td>
              <td>{{ inventory.Amount }}</td>
            </tr>
            <tr class="active">
              <td>Total</td>
              <td></td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-action">
        <button class="btn btn-ghost" :class="{ 'btn-disabled': loading, 'loading': loading }" @click="submit">Approve</button>
      </div>
    </div>
  </label>
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
    },
    inventoryData: {
      type: Object,
      default: () => []
    },
    count: {
      type: Number,
      default: 0
    },
    findItem: { type: Function },
  },
  setup(props) {
    const loading = ref(false)

    async function submitInventory() {
      loading.value = true;
      await $fetch('/api/inventory/' + props.selectedApartment, {
        method: 'PUT',
        body: props.inventoryData
      });
      loading.value = false;
    }

    const submit = () => {
      submitInventory();
    }

    return {
      submit,
      loading
    }
  }
}
</script>