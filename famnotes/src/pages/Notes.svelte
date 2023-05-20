<script lang="ts">
  import { onMount } from "svelte";
  import request from "../utils/request";
  import apis from "../apis";
  import { userState } from "../store";

  let user = null;

  let notes = [];
  let viewonlyNotes = [];
  let editonlyNotes = [];

  let selectedNote = null;

  let editAllowed = false;
  let editNoteTitle = "";
  let newNoteItem = "Random note item " + Math.round(Math.random() * 100);

  onMount(async () => {
    userState.subscribe((value) => {
      user = value;
    });

    let data = await request({
      url: apis.notes,
    });

    notes = data.notes;
    editonlyNotes = data.shared?.editonlyNotes;
    viewonlyNotes = data.shared?.viewonlyNotes;

    setSelectedNote(notes[0]);
  });

  function setSelectedNote(note) {
    selectedNote = note;

    if (editValidation(note)) {
      editNoteTitle = selectedNote.title;
    }
  }

  function editValidation(note) {
    let editors = [note.user_id, ...note.editonlyUsers?.map((el) => el.id)];

    if (editors.includes(user.id)) editAllowed = true;
    else editAllowed = false;

    return editAllowed;
  }

  async function submitNoteTitle() {
    if (editValidation(selectedNote)) {
      const data = await request({
        url: apis.note(selectedNote.id),
        method: "PATCH",
        body: { title: editNoteTitle },
      });

      console.log(data);
    }
  }

  function addNoteItemToNote(item) {
    if (selectedNote) {
      console.log(selectedNote);
    }
  }
</script>

<div class="h-screen bg-violet-50 overflow-hidden">
  <div class="flex h-full sm:gap-2">
    <div class="w-0 sm:w-72 pt-12 max-h-full">
      <div
        class="h-full overflow-y-scroll bg-violet-100 flex flex-col rounded-md shadow shadow-violet-300"
      >
        <div class="pt-6 ml-6 font-bold text-violet-400">My Notes</div>
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

        <div class="pt-6 ml-6 font-bold text-violet-400">Shared</div>
        {#each editonlyNotes as note}
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
        {#each viewonlyNotes as note}
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
    <div class="grow max-h-full overflow-y-scroll">
      <div class="container mx-auto text-right">
        <button class="m-2 px-2 text-violet-400 inline-flex items-center gap-2"
          ><span>Logout</span>
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg></button
        >
      </div>
      <div class=" pt-8 sm:pt-32 max-w-lg mx-auto px-2">
        {#if selectedNote}
          <div>
            <h1 class="text-3xl md:text-4xl font-bold mb-8">
              {selectedNote.title}
            </h1>

            {#if editAllowed}
              <div class="mb-8">
                <form on:submit|preventDefault={submitNoteTitle}>
                  <input
                    type="text"
                    id="note-item"
                    name="note-item"
                    placeholder="Write up what you want..."
                    disabled={!editAllowed}
                    bind:value={editNoteTitle}
                    class="w-full outline-none p-2 px-4 rounded bg-violet-50 border border-transparent border-b-violet-500
                focus:border-violet-500 focus:ring-2 focus:ring-violet-300 placeholder:text-violet-300 text-violet-500
                disabled:cursor-not-allowed disabled:select-none"
                  />
                  <p class="text-violet-400 py-0.5 text-xs text-right">
                    Press <span class="px-1 font-bold">Enter &#x23CE</span> to add
                    the item
                  </p>
                  <button type="submit" class="invisible" />
                </form>
              </div>
            {/if}

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
