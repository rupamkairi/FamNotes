<script lang="ts">
  let email = "rupam@fn.com",
    password = "1234@Pass";
  async function loginSubmit() {
    let data = { email, password };

    const response = await fetch("http://127.0.0.1:3333/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data = await response.json();
    console.log(data);
  }
</script>

<div>
  <div class="max-w-screen-sm w-64 mx-auto">
    <h2 class="text-2xl font-black mb-8">Log In</h2>
    <form
      action=""
      on:submit|preventDefault={loginSubmit}
      class="flex flex-col gap-2"
    >
      <input
        type="email"
        id="email"
        name="email"
        placeholder="email"
        bind:value={email}
        class="border outline-none p-2 px-4 rounded"
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="password"
        bind:value={password}
        class="border outline-none p-2 px-4 rounded"
      />
      <input
        type="submit"
        class="border border-blue-500 bg-blue-500 text-left text-white outline-none p-2 px-4 rounded"
      />
    </form>
  </div>
</div>
