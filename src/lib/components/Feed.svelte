<script lang="ts">
import type { Post as PostType } from '@prisma/client/index'
import Post from '$lib/components/Post.svelte'

export let posts: PostType[]
export let showFeaturedFlags = true
</script>

<div class="grid gap-4">
  {#if posts?.length}
    {#each posts as post}
      <Post
        {post}
        showFeaturedFlag={showFeaturedFlags}
      />
    {/each}
  {:else}
    <p class="text-gray-500">No posts.</p>
  {/if}
</div>
