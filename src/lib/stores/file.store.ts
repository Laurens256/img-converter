import { writable, type Writable } from 'svelte/store';
import type { UploadedFile } from '$lib/types';

export const uploadedFiles: Writable<UploadedFile[]> = writable([]);
