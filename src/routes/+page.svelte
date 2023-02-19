<div class="navbar bg-base-400">
    <div class="navbar-start">
    </div>
    <div class="navbar-center">
        <a class="normal-case text-xl text-pop-up-bottom">AI Notes ( Hackathon ) </a>
    </div>
    <div class="navbar-end">
        <button on:click={() => {location.href="Get-Started"}} class="btn btn-primary"> Get Started </button>
    </div>
  </div>

  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">AI Note App</h1>
        <p class="py-6"> AI note taking app to <code>ASSIST</code> you not <code>REPLACE</code> you. Unlike other apps we focus on <code>INTEGRATING</code> with your workflow to <code>BOOST</code> your productivity.</p>
        <button on:click={() => {location.href="Get-Started"}} class="btn btn-primary">Get Started</button>
      </div>
    </div>
  </div>

  <footer class="footer bg-neutral text-white">
      <div>
        <span class="footer-title">Eduard Faus (Developer)</span>
        <span class="footer-subtitle">© 2023</span> 
      </div>
  </footer>
  

<style>

	:root {
		--accent: 124, 58, 237;
		--accent-gradient: linear-gradient(45deg, rgb(var(--accent)), #da62c4 30%, white 60%);
	}
	html {
		font-family: system-ui, sans-serif;
		background-color: #F6F6F6;
	}
	code {
		font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
			Bitstream Vera Sans Mono, Courier New, monospace;
      font-size: 0.875em;
    font-weight: bold;
    background: rgba(var(--accent),12%);
    color: rgb(var(--accent));
    border-radius: 4px;
    padding: 0.3em 0.45em;
    }main {
		margin: auto;
		padding: 1.5rem;
		max-width: 60ch;
	}
	h1 {
		font-size: 3rem;
		font-weight: 800;
		margin: 0;
	}
	.text-gradient {
		background-image: var(--accent-gradient);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 400%;
		background-position: 0%;
	}
	.instructions {
		line-height: 1.6;
		margin: 1rem 0;
		border: 1px solid rgba(var(--accent), 25%);
		background-color: white;
		padding: 1rem;
		border-radius: 0.4rem;
	}
	.instructions code {
		font-size: 0.875em;
		font-weight: bold;
		background: rgba(var(--accent), 12%);
		color: rgb(var(--accent));
		border-radius: 4px;
		padding: 0.3em 0.45em;
	}
	.instructions strong {
		color: rgb(var(--accent));
	}
	.link-card-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(24ch, 1fr));
		gap: 1rem;
		padding: 0;
	}
</style>