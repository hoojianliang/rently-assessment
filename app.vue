<template>
  <div class="container mx-auto mt-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <ApartmentList ref="ApartmentListRef"/>
      <InventoryList :selected-apartment="selectedApartment" :selected-apartment-label="selectedApartmentLabel" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'

const ApartmentListRef = ref(0)
const selectedApartment = computed(() => ApartmentListRef.value?.selectedApartment)
const selectedApartmentLabel = computed(() => ApartmentListRef.value?.selectedApartmentLabel)
</script>