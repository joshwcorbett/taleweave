<script lang="ts">
import type { ActionData } from './$types'
import { enhance } from '$app/forms'

export let form: ActionData
</script>

<form
  method="POST"
  class="grid gap-4"
  use:enhance
>

  <label class="grid">
    <span>Email</span>
    <input class="px-3 py-2 rounded-md" type="email" name="email" required />
  </label>

  <label class="grid">
    <span>Password</span>
    <input class="px-3 py-2 rounded-md" type="password" name="password" required />
  </label>

  {#if form?.message}
    <p class={ form?.success ? 'text-emerald-300' : 'text-rose-300' }>{form.message}</p>
  {/if}

  <button type="submit" class="px-3 py-2 font-bold rounded-md bg-white/10 hover:bg-white/20">
    Login
  </button>

  <p>Don't have an account yet? <a class="text-orange-300 underline hover:text-orange-400" href="/register">Create an account</a></p>
</form>
