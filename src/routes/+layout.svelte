<script lang="ts">
  import '$lib/polyfills';
</script>

<div class="container">
  <slot/>
</div>

<style>
  .container {
    width: min(95%, 60rem);
    margin: 0 auto;
  }
</style>