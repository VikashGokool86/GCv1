<template>
    <div class="race-detail">
        <div>Test</div>

        <p>Race Name: {{ race }}</p>
      <!-- Display other race details here -->
    </div>
  </template>

  <script>
  export default {
    props: {
      race: {
        type: Object,
      }
    }
  }
  </script>
