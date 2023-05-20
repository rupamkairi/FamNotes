<script lang="ts">
  import { Link, navigate } from "svelte-navigator";
  import apis from "../apis";
  import request from "../utils/request";
  import routes from "../routes";
  import { isAuthinticated, userState } from "../store";

  let email = "rupam@fn.com",
    password = "1234@Pass";
  async function loginSubmit() {
    let body = { email, password };

    let data = await request({
      method: "POST",
      url: apis.login,
      body,
    });

    if (data) {
      isAuthinticated.set(true);
      userState.set(data);
      localStorage.setItem("isAuthinticated", String(true));
      localStorage.setItem("userId", data.id);
      navigate(routes.notes);
    }
  }
</script>

<div class="h-screen flex items-center justify-center">
  <div
    class="max-w-sm mx-auto grow py-16 px-8 rounded-lg bg-violet-50 shadow shadow-violet-300"
  >
    <h2 class="mb-12 text-xl font-bold">Welcome back,</h2>
    <form
      action=""
      on:submit|preventDefault={loginSubmit}
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
          placeholder="**34@Pa**"
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
        <span>Log In</span>
        <svg
          class="w-5 h-5 rotate-180"
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </button>
      <Link
        to="/register"
        class="max-w-fit text-sm text-violet-500 text-right hover:underline"
        >Register?
      </Link>
    </form>
  </div>
</div>
