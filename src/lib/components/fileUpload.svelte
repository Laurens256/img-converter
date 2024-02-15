<script lang="ts">
  import { uploadedFiles, imageTypes, type UploadedFile } from '$lib';
  import { IconFileUpload } from '@tabler/icons-svelte';

  export let iconSize = 0;

  let fileInput: HTMLInputElement;
  let isDraggingOver = false;
  let inputFocused = false;

  // TODO: validate file types
  const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const newFiles: UploadedFile[] = Array.from(e.currentTarget.files || []).map((file) => ({
      file,
      output: imageTypes.png.extension,
      resolutionMultiplier: {
        width: 1,
        height: 1
      }
    }));
    console.log(newFiles)

    const mergedFiles = [...newFiles, ...$uploadedFiles];

    uploadedFiles.set(mergedFiles);
  };

  const handleFileDrag = (e: DragEvent) => {
    e.preventDefault();
    isDraggingOver = e.type === 'dragover';
  };

  const handleFileDrop = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer) {
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('input'));
    }
  };
</script>

<input
  class="input"
  on:input={handleInput}
  on:focus={() => (inputFocused = true)}
  on:blur={() => (inputFocused = false)}
  bind:this={fileInput}
  id="file_input"
  name="file_input"
  multiple
  type="file"
  accept="image/*, application/gzip, application/zip, application/x-7z-compressed, application/x-rar-compressed, application/x-tar, application/x-bzip2, application/x-7z-compressed, application/x-xz, application/x-lzip, application/x-lzma, application/x-lzop"
/>
<label
  for="file_input"
  class={`
  ${$$restProps.class}
  ${isDraggingOver ? ' draggingOver' : ''}
  ${inputFocused ? ' inputFocused' : ''}
   label`}
  on:dragover={handleFileDrag}
  on:dragend={handleFileDrag}
  on:dragleave={handleFileDrag}
  on:drop={handleFileDrop}
>
  {#if iconSize}
    <IconFileUpload
      class={`${$$restProps.iconClass} icon`}
      stroke={1.5}
      size={iconSize}
    />
  {/if}
  <slot />
</label>

<style>
  .label {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: center;
  }
  .input {
    position: absolute;
    background-color: red;
    position: absolute;
    left: calc(-100vw - 1px);
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .icon {
    width: 2rem;
  }
</style>
