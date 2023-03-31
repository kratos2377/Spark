import Link from "next/link"

const Navbar = () => {
return <><nav className="navbar navbar-expand-lg navbar-light bg-light">
<div className="container-fluid">
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link href="/"><a className="navbar-brand" href="#">Spark</a></Link>
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
<Link href="/myTweets"><a className="nav-link active text-light" aria-current="page" href="#">My Tweets</a></Link>
      </li>
    </ul>

    <button type="button" className="btn btn-primary">Connect Wallet</button>
  </div>
</div>
</nav></>
}


export default Navbar