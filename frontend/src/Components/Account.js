export default function Account(props) {
  return (
    <div className="container bg-dark my-5 p-5 rounded shadow-lg">
      {props.isPhone ?
        <>
          <div className="row pt-4 d-flex justify-content-center">
            <span className="border border-warning text-warning mx-2 p-2 w-auto">Balance: 0.3450 BNB</span>
          </div>
          <div className="row pt-4 d-flex justify-content-center">
            <h3 className="text-white text-center mx-2">TRASANCCIONES</h3>
          </div>
        </>
        :
        <>
          <div className="row pt-4">
            <div className="col col-2">
              <span className="border border-warning text-warning mx-2 p-2">Balance: 0.3450 BNB</span>
            </div>
            <div className="col col-8">
              <h3 className="text-white text-center mx-2">TRASANCCIONES</h3>
            </div>
            <div className="col col-2">

            </div>
          </div>
        </>
      }

      <div className="row pb-5 pt-4">
        <form className="d-flex">
          <input className="form-control me-2" style={{ height: "35px" }} type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-primary text-white" style={{ height: "35px" }} type="submit">Search</button>
        </form>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Txn Hash</th>
                <th scope="col">Block</th>
                <th scope="col">Age</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col">[Txn Fee]</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">0x2d1f8c4bbd0bb68916e22...</a></th>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
              </tr>
              <tr>
                <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">0x4d1f8c4bbd0bb68916e22...</a></th>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
              </tr>
              <tr>
                <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">0x5d1f8c4bbd0bb68916e22...</a></th>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
              </tr>
              <tr>
                <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">0x6d1f8c4bbd0bb68916e22...</a></th>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
              </tr>
              <tr>
                <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">0x7d1f8c4bbd0bb68916e22...</a></th>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}