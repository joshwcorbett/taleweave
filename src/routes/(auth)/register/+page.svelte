<script lang="ts">
import type { ActionData } from './$types'
import { enhance } from '$app/forms'

export let form: ActionData

let username: string
let password: string
let email: string
let confirmPassword: string
let acceptsTOS: boolean

$: passwordsMatch = password === confirmPassword
$: canSubmit = username && email && password && passwordsMatch && acceptsTOS
</script>

<form
  method="POST"
  class="grid gap-4"
  use:enhance
>

  <label class="grid">
    <span>Email</span>
    <input bind:value={email} class="px-3 py-2 rounded-md" type="email" name="email" required />
  </label>

  <label class="grid">
    <span>Username</span>
    <input bind:value={username} class="px-3 py-2 rounded-md" type="text" name="username" required />
  </label>

  <label class="grid">
    <span>Password</span>
    <input bind:value={password} class="px-3 py-2 rounded-md" type="password" name="password" required />
  </label>

  <label class="grid">
    <span>Confirm Password</span>
    <input bind:value={confirmPassword} class="px-3 py-2 rounded-md" type="password" name="password" required />
    {#if confirmPassword?.length && !passwordsMatch}
      <span class="text-rose-300">Passwords do not match</span>
    {/if}
  </label>

  <label class="flex">
    <input type="checkbox" bind:checked={acceptsTOS} required />
    <span class="ml-2">I agree to the <a class="text-orange-300 underline hover:text-orange-400" href="https://raw.githubusercontent.com/joshwcorbett/taleweave/master/TOS.md">Terms of Service</a></span>
  </label>

  {#if form?.message}
    <p class={ form?.success ? 'text-emerald-300' : 'text-rose-300' }>{form.message}</p>
  {/if}

  <button disabled={!canSubmit} type="submit" class="px-3 py-2 font-bold rounded-md disabled:opacity-50 disabled:pointer-events-none bg-white/10 hover:bg-white/20">
    Register
  </button>

  <p>Already have an account? <a class="text-orange-300 underline hover:text-orange-400" href="/login">Log in instead</a></p>
</form>
