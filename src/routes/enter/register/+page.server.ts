import { error, fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/auth'
import type { PageServerLoad, Actions } from './$types'
// import { Prisma } from '@prisma/client'

// redirect to home if already has valid session
export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()
  if (session) {
    throw redirect(302, '/')
  }
  return {}
}

export const actions: Actions = {
  // create user
  default: async ({ request, locals }) => {
    // retrieve form data
    const { username, password } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>

    // fail if either username or password is not of type string
    if ([username, password].some(x => typeof x !== 'string')) {
      return fail(400, { message: 'username or password are invalid' })
    }

    // create user
    await auth.createUser({
      primaryKey: {
        providerId: 'username',
        providerUserId: username,
        password
      },
      attributes: {
        username,
        id: username,
      },
    })
      .then(async (user) => {
        const session = await auth.createSession(user.userId)
        locals.auth.setSession(session)
        throw redirect(302, '/')
      })
      .catch((err) => {
        console.error(err)
        return fail(400, { message: 'Could not create user' })
      })
  }
}
