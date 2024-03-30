<template>
    <div class="race-detail">
        <div>Test</div>
        <p>Location: {{ location }}</p>
        <p>Race Name: {{ race }}</p>
      <!-- Display other race details here -->
    </div>
  </template>

  <script>
  export default {
    props: {
      race: {
        type: Object,
      },
      location: String
    }
  }
  </script>
