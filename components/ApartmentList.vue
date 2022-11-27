<template>
  <div>
    <h2><b>Apartment List</b></h2>
    <div class="bg-base-100 shadow-xl">
      <ul class="menu max-sm:menu-horizontal">
        <li v-for="apartment in resApartment" @click="setApartment(apartment)"
          :class="{ bordered: selectedApartment === apartment.ID }">
          <a>#{{ apartment.Floor }}-{{ apartment.DoorNumber }}, {{ apartment.Address }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { data: resApartment } = await useFetch('/api/apartment')
const selectedApartment = ref(0)
const selectedApartmentLabel = ref("")

interface apartmentProps {
  ID: number,
  Address: string,
  Floor: number,
  DoorNumber: number,
}
// functions
function setApartment(apartment: apartmentProps) {
  selectedApartment.value = apartment.ID;
  selectedApartmentLabel.value = `#${apartment.Floor}-${apartment.DoorNumber}, ${apartment.Address}`
}

defineExpose({
  selectedApartment,
  selectedApartmentLabel
})
</script>