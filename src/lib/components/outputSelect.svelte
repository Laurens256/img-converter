<script lang="ts">
  import { uploadedFiles, imageTypes, type ImageExtension } from '$lib';

  export let itemIndex: number;
  export let selectedOutput: ImageExtension | null;

  const imageExtensions: ImageExtension[] = Object.values(imageTypes).map(
    (obj) => obj.extension
  );

  const handleOutputChange = (output: string) => {
    const newUploadedFiles = $uploadedFiles.map((file, index) => {
      if (index === itemIndex || itemIndex === -1) {
        return {
          ...file,
          output: output as ImageExtension
        };
      }
      return file;
    });
    uploadedFiles.set(newUploadedFiles);
  };
</script>

<div class="container">
  <label for="image_output">{itemIndex === -1 ? 'Convert all to:' : 'Output:'}</label>
  <select
    name="image_output"
    id="image_output"
    class="select"
    on:change={(e) => handleOutputChange(e.currentTarget.value)}
    value={selectedOutput}
  >
    {#each imageExtensions as extension}
      <option value={extension}>
        {extension}
      </option>
    {/each}
  </select>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .select {
    appearance: none;
    background-color: transparent;
    border: solid 1px var(--accent-color);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    min-width: 6rem;
  }
</style>
