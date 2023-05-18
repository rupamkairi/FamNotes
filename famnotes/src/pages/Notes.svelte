<script lang="ts">
  import { onMount } from "svelte";
  import request from "../utils/request";
  import apis from "../apis";

  let notes = [];
  let selectedNote = null;

  onMount(async () => {
    let data = await request({
      url: apis.notes,
    });

    notes = data;
  });

  function setSelectedNote(note) {
    selectedNote = note;
  }
</script>

<div class="h-screen bg-violet-50 overflow-hidden">
  <div class="flex h-full sm:gap-2">
    <div class="w-0 sm:w-72 pt-12 max-h-full">
      <div
        class="h-full overflow-y-scroll bg-violet-100 flex flex-col rounded-md shadow shadow-violet-300"
      >
        {#each notes as note}
          <button
            class="mx-2 mt-2 py-3 px-4 rounded text-left hover:bg-violet-200 hover:shadow hover:shadow-violet-300"
            on:click={() => {
              setSelectedNote(note);
            }}
          >
            <p class="truncate mb-0.5 text-sm font-semibold">
              {note.title}
            </p>
            <p class="truncate text-xs opacity-50">
              {new Date(note.created_at).toDateString()}
            </p>
          </button>
        {/each}
      </div>
    </div>
    <div class="grow pt-8 sm:pt-32 max-h-full overflow-y-scroll">
      <div class="max-w-lg mx-auto px-2">
        {#if selectedNote}
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-8">
              {selectedNote.title}
            </h1>
            <div class="grid grid-cols-8 items-center">
              <button class="col-span-1 text-red-500">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <div class="col-span-6">
                <p class="h-12 whitespace-normal text-ellipsis overflow-hidden">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Corrupti nihil vitae nesciunt itaque rem tempora delectus
                  deserunt, harum praesentium nobis quo molestiae repellat eius
                  accusantium odit sequi assumenda ut aspernatur?
                </p>
              </div>
              <button class="col-span-1 text-green-500">
                <svg
                  class="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        {/if}
        {#if !selectedNote}
          <div>
            <p class="text-violet-300">Select a Note to see its content...</p>
          </div>
        {/if}
        <!-- <pre>{JSON.stringify(notes, null, 2)}</pre> -->
        <p class="my-32" />
      </div>
    </div>
  </div>
</div>
