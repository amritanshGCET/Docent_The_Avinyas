import { useState } from 'react'

function SignInPage() {
	const [mode, setMode] = useState('signin')
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		remember: true,
	})

	const isSignUp = mode === 'signup'

	const updateField = (key, value) => {
		setForm((prev) => ({ ...prev, [key]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	return (
		<main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-10 sm:px-6 lg:px-8">
			<section className="grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[1fr_1.1fr]">
				<div
					className="relative hidden bg-cover bg-center bg-no-repeat p-8 text-white lg:block"
					style={{ backgroundImage: "url('https://images.pexels.com/photos/3532557/pexels-photo-3532557.jpeg')" }}
				>
					<div className="absolute inset-0 bg-black/45" aria-hidden="true" />
					<div className="relative z-10 flex h-full flex-col justify-between">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-100">Docent access</p>
							<h1 className="mt-4 text-4xl font-semibold leading-tight text-violet-100/95">
								{isSignUp ? 'Create your traveler profile' : 'Welcome back, explorer'}
							</h1>
							<p className="mt-4 max-w-md text-sm text-violet-100/95">
								{isSignUp
									? 'Join Docent to build itineraries, save favorite places, and access smart travel recommendations.'
									: 'Sign in to continue planning your journeys, track crowd insights, and manage your saved destinations.'}
							</p>
						</div>

						<div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
							<p className="text-sm font-medium">Travel smarter with personalized planning.</p>
							<p className="mt-2 text-xs text-violet-100/90">One account for itinerary planning, place insights, and saved routes.</p>
						</div>
					</div>
				</div>

				<div className="p-6 sm:p-8 lg:p-10">
					<div className="mb-6 inline-flex rounded-xl bg-black/5 p-1">
						<button
							type="button"
							onClick={() => setMode('signin')}
							className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
								!isSignUp ? 'bg-white text-black shadow-sm' : 'text-black/70 hover:text-black'
							}`}
						>
							Sign In
						</button>
						<button
							type="button"
							onClick={() => setMode('signup')}
							className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
								isSignUp ? 'bg-white text-black shadow-sm' : 'text-black/70 hover:text-black'
							}`}
						>
							Sign Up
						</button>
					</div>

					<h2 className="text-2xl font-semibold text-black">{isSignUp ? 'Create account' : 'Sign in to your account'}</h2>
					<p className="mt-1 text-sm text-black/65">
						{isSignUp
							? 'Start with your details and begin planning your trips.'
							: 'Enter your credentials to continue.'}
					</p>

					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						{isSignUp ? (
							<div>
								<label htmlFor="name" className="mb-1 block text-sm font-medium text-black/80">
									Full Name
								</label>
								<input
									id="name"
									type="text"
									value={form.name}
									onChange={(e) => updateField('name', e.target.value)}
									placeholder="Alex Traveler"
									className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
								/>
							</div>
						) : null}

						<div>
							<label htmlFor="email" className="mb-1 block text-sm font-medium text-black/80">
								Email
							</label>
							<input
								id="email"
								type="email"
								value={form.email}
								onChange={(e) => updateField('email', e.target.value)}
								placeholder="you@example.com"
								className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
								required
							/>
						</div>

						<div>
							<label htmlFor="password" className="mb-1 block text-sm font-medium text-black/80">
								Password
							</label>
							<input
								id="password"
								type="password"
								value={form.password}
								onChange={(e) => updateField('password', e.target.value)}
								placeholder="Enter your password"
								className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm text-black outline-none transition focus:border-violet-600 focus:ring-2 focus:ring-violet-600/20"
								required
							/>
						</div>

						<div className="flex items-center justify-between gap-3">
							<label className="inline-flex items-center gap-2 text-sm text-black/75">
								<input
									type="checkbox"
									checked={form.remember}
									onChange={(e) => updateField('remember', e.target.checked)}
									className="h-4 w-4 rounded border-black/20 text-violet-600 focus:ring-violet-600"
								/>
								Remember me
							</label>
							{!isSignUp ? (
								<button
									type="button"
									className="text-sm font-medium text-violet-700 transition hover:text-violet-800"
								>
									Forgot password?
								</button>
							) : null}
						</div>

						<button
							type="submit"
							className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
						>
							{isSignUp ? 'Create account' : 'Sign In'}
						</button>
					</form>
				</div>
			</section>
		</main>
	)
}

export default SignInPage
