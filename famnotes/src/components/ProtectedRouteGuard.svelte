<script>
  import { useNavigate, useLocation } from "svelte-navigator";
  import { isAuthinticated } from "../store";

  const navigate = useNavigate();
  const location = useLocation();

  $: if (!$isAuthinticated) {
    navigate("/login", {
      state: { from: $location.pathname },
      replace: true,
    });
  }
</script>

{#if $isAuthinticated}
  <slot />
{/if}
