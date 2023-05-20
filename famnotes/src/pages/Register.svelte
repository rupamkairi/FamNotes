<script lang="ts">
  import { Link, navigate } from "svelte-navigator";
  import apis from "../apis";
  import request from "../utils/request";
  import { isAuthinticated } from "../store";
  import routes from "../routes";

  let email = "",
    password = "";
  async function registerSubmit() {
    let body = { email, password };

    let data = await request({
      method: "POST",
      url: apis.register,
      body,
    });

    if (data) {
      isAuthinticated.set(true);
      localStorage.setItem("isAuthinticated", String(true));
      navigate(routes.notes);
    }
  }
</script>

<div class="h-screen flex items-center justify-center">
  <div
    class="max-w-sm mx-auto grow py-16 px-8 rounded-lg bg-violet-50 shadow shadow-violet-300"
  >
    <div>
      <h2 class="mb-12 text-xl font-bold">Hello & Welcome,</h2>
      <form
        action=""
        on:submit|preventDefault={registerSubmit}
        class="flex flex-col gap-2"
      >
        <div>
          <label for="email" class="text-sm text-violet-500">
            <p>Email</p>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="rupam@famnotes.com"
            bind:value={email}
            class="w-full outline-none p-2 px-4 mb-4 rounded bg-violet-50 border border-transparent border-b-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 placeholder:text-violet-300"
          />
        </div>
        <div>
          <label for="password" class="text-sm text-violet-500">
            <p>Password</p>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Pa**@**34"
            bind:value={password}
            class={"w-full outline-none p-2 px-4 mb-8 rounded bg-violet-50 border border-transparent border-b-violet-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-300 placeholder:text-violet-300 " +
              (password && "font-black ")}
          />
        </div>
        <button
          type="submit"
          class=" p-2 px-4 rounded border-2 outline-none flex justify-between items-center text-sm font-semibold text-violet-500 hover:text-white
        border-transparent border-b-violet-700 hover:border-b-violet-700 hover:bg-violet-500 transition-all"
        >
          <span>Register</span>
          <svg
            class="w-5 h-5 animate-pulse"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        </button>
        <Link
          to="/login"
          class="max-w-fit text-sm text-violet-500 text-right hover:underline"
          >Log In?
        </Link>
      </form>
    </div>
  </div>
</div>
