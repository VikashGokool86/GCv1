<template>
    <div>
      <input type="text" v-model="searchQuery" placeholder="Search for a jockey or horse" />
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          <a :href="`/racecard/${result.id}`">{{ result.name }}</a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        allData: [],
        loading: true,
        error: null
      };
    },
    computed: {
      searchResults() {
        if (!this.searchQuery) return [];
        return this.allData.filter((entry) => {
          return (entry.type === 'jockey' || entry.type === 'horse') &&
                 entry.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    },
    methods: {
      async fetchData() {
        try {
          const files = ['/data/RaceCard_XGD.json', '/data/Horses.json', '/data/Jockeys.json'];
          const responses = await Promise.all(files.map(file => fetch(file)));
          const data = await Promise.all(responses.map(response => response.json()));
          this.allData = data.flat(); // Combine all results into a single array
          this.loading = false;
        } catch (error) {
          console.error('Error fetching data:', error);
          this.error = error;
        }
      }
    },
    created() {
      this.fetchData();
    }
  };
  </script>
  