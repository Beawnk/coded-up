import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useFetchDataStore = defineStore('fetchData', () => {
  const data = ref(null);
  const loading = ref(false);

  const fetchData = async (tag) => {
    loading.value = true;
    let dataAwait = null;
    try {
      const response = await fetch(`http://localhost:3000${tag}`);
      dataAwait = await response.json();
      data.value = dataAwait;
      setTimeout(() => {
        loading.value = false;
      }, 500);
      return dataAwait;
    } catch (error) {
      console.error('Error fetching data:', error);
      setTimeout(() => {
        loading.value = false;
      }, 500);
    }
  }

  return {
    data,
    loading,
    fetchData
  }
})
