<script lang="ts">
  import { Router, Route, Link } from "svelte-navigator";
  import ProtectedRoute from "../components/ProtectedRoute.svelte";
  import Login from "./Login.svelte";
  import Register from "./Register.svelte";
  import Notes from "./Notes.svelte";
  import Profile from "./Profile.svelte";
</script>

<div>
  <Router>
    <Route path="/">
      <div class="flex justify-between items-baseline">
        <div>
          <p>This Index Page</p>
        </div>
        <div>
          <nav>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
          </nav>
        </div>
      </div>
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />

    <ProtectedRoute path="/app/*">
      <Route path="/notes" component={Notes} />
      <Route path="/profile" component={Profile} />
    </ProtectedRoute>

    <Route path="*">404</Route>
  </Router>
</div>
