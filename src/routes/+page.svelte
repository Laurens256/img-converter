<script lang="ts">
  import { uploadedFiles } from '$lib/stores';
  import { handleDownload } from '$lib/utils';
  import { FileUpload, FileListItem, OutputSelect, SettingsModal } from '$lib/components';
  import { IconTrashX } from '@tabler/icons-svelte';

  let settingsModalFileIndex: number | null = null;

  let downloadButtonState = {
    text: 'Download all',
    disabled: false
  };

  const setSettingsModalFileIndex = (index: number | null) => {
    settingsModalFileIndex = index;
  };

  const handleDownloadAll = async () => {
    try {
      await handleDownload($uploadedFiles, (count) => {
        downloadButtonState = {
          text: `Converting (${count} / ${$uploadedFiles.length})`,
          disabled: true
        };
      });

      downloadButtonState = {
        text: `Downloaded (${$uploadedFiles.length})`,
        disabled: false
      };
    } catch (error) {
      console.log(error);
      downloadButtonState = {
        text: 'Download failed',
        disabled: false
      };
    }
  };

  $: commonOutput = (() => {
    const outputsSet = new Set(Object.values($uploadedFiles).map((file) => file.output));
    return outputsSet.size === 1 ? Array.from(outputsSet)[0] : null;
  })();
</script>

<main class="container">
  <div class="pageHeader">
    <h1 class="pageTitle">Image converter</h1>
    <p class="pageSubtitle">Convert unlimited images online, for free</p>
  </div>
  {#if !$uploadedFiles.length}
    <FileUpload class="bigFileUpload" iconClass="test" iconSize={64}>
      <p class="uploadSubheading">Drag and drop your images here or click to upload</p>
    </FileUpload>
  {:else}
    <div class="fileListHeader">
      <div class="addOrRemoveSection">
        <FileUpload class="smallFileUpload addOrRemove" iconSize={20}>Add more</FileUpload
        >
        <button
          class="removeAllButton"
          on:click={() => uploadedFiles.set([])}
          aria-label="remove all images"
        >
          <IconTrashX />
        </button>
      </div>

      <div class="actionsSection">
        <OutputSelect itemIndex={-1} selectedOutput={commonOutput} />
        <button
          on:click={handleDownloadAll}
          class="downloadButton"
          disabled={downloadButtonState.disabled}
        >
          {downloadButtonState.text}
        </button>
      </div>
    </div>

    <ul class="fileList">
      {#each $uploadedFiles as uploadedFile, i}
        <FileListItem itemIndex={i} {uploadedFile} {setSettingsModalFileIndex} />
      {/each}
    </ul>
  {/if}

  <SettingsModal
    uploadedFileIndex={settingsModalFileIndex}
    setModalFileIndex={setSettingsModalFileIndex}
  />
</main>

<style>
  .container {
    padding-block: min(8rem, 12vh) 1rem;
  }

  .pageHeader {
    text-align: center;
    margin-block: 2rem 4rem;
  }
  .pageTitle {
    font-size: 2.5rem;
    margin-bottom: 0.7rem;
  }
  .pageSubtitle {
    font-size: 1.3rem;
  }

  .container :global(.bigFileUpload) {
    width: 100%;
    height: 20rem;
    background-color: var(--secondary-bg);
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    padding-inline: 1rem;
    text-align: center;

    &.inputFocused {
      outline: dashed 3px var(--accent-color);
      outline-offset: 3px;
    }

    &::after {
      content: 'Drop to upload';
      --outline-size: 0.3rem;
      opacity: 0;
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.9);
      outline: dashed var(--outline-size) var(--accent-color);
      outline-offset: calc(var(--outline-size) * -1);
      transition: opacity 0.2s ease-in-out;
      border-radius: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--text-white);
    }

    &.draggingOver {
      &::after {
        opacity: 1;
      }
    }
  }

  .fileListHeader {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .addOrRemoveSection {
    display: flex;
    gap: 0.5rem;
  }

  .fileListHeader :global(.smallFileUpload) {
    color: var(--text-white);
    border: solid 1.5px var(--accent-color);
    padding: 0.5rem 1rem;
    gap: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.15s ease-in-out;

    &:hover,
    &:focus-visible,
    &.draggingOver,
    &.inputFocused {
      background-color: var(--accent-color);
    }
    &.inputFocused {
      outline: solid 2px var(--accent-color);
      outline-offset: 3px;
    }
  }

  .actionsSection {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .downloadButton {
    background-color: var(--accent-color);
    color: var(--text-white);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    min-width: 10rem;
  }

  .fileList {
    max-height: 35rem;
    overflow-y: auto;
		padding-bottom: 5rem; /* TODO: variable for popover height */
  }
</style>
