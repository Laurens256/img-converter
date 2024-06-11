<script lang="ts">
  import { uploadedFiles } from '$lib/stores';

  export let uploadedFileIndex: number | null;
  export let setModalFileIndex: (index: number | null) => void;

  let dialogElement: HTMLDialogElement | null = null;

  $: uploadedFileIndex !== null ? dialogElement?.showModal() : dialogElement?.close();
  $: uploadedFile = uploadedFileIndex !== null ? $uploadedFiles[uploadedFileIndex] : null;
</script>

<dialog bind:this={dialogElement}>
  {#if uploadedFile}
  <div class="dialogInner">
    <h2>Image settings</h2>
    <p>File name: <span>{uploadedFile.file.name}</span></p>
  </div>
  {/if}
  <div class="backdrop" on:click={() => setModalFileIndex(null)} role="presentation" />
</dialog>

<style>
  dialog {
    width: 100%;
    height: 100%;
    padding: 0;
    max-width: 100%;
    max-height: 100%;
    background-color: transparent;
    border: 0;
  }

  .dialogInner {
    position: absolute;
    left: 50%;
    top: min(8rem, 12vh);
    transform: translateX(-50%);
    padding: 1rem;
    background-color: var(--primary-bg);
    border-radius: 0.5rem;
    width: min(90%, 35rem);
  }

  .backdrop {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    inset: 0;
    z-index: -1;
  }
  dialog::backdrop {
    display: none;
  }
</style>
