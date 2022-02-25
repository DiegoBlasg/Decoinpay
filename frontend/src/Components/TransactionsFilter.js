export default function TransactionsFilter(props) {

    const filterDate = () => {
        const year = document.getElementById("year").value
        const month = document.getElementById("month").value
        const day = document.getElementById("day").value
        props.setFilterDate([year, month, day])
    }

    return (
        props.isPhone ?
            <div>
                <div className="row pb-4 pt-4">
                    <form className="d-flex">
                        <input className="form-control" style={{ height: "50px" }} onChange={e => props.setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>
                <div className="row">
                    <div className="col-6 d-flex">
                        <h4 className='text-white mx-2'>Año</h4>
                        <select id="year" className='form-select btn-primary' onChange={filterDate}>
                            <option value="">Todos</option>
                            <option value="2022">2022</option>
                        </select>
                    </div>
                    <div className="col-6 d-flex">
                        <h4 className='text-white mx-2'>Mes</h4>
                        <select id="month" className='form-select btn-primary' onChange={filterDate}>
                            <option value="">Todos</option>
                            <option value="01">Enero</option>
                            <option value="02">Febrero</option>
                            <option value="03">Marzo</option>
                            <option value="04">Abril</option>
                            <option value="05">Mayo</option>
                            <option value="06">Junio</option>
                            <option value="07">Julio</option>
                            <option value="08">Agosto</option>
                            <option value="09">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                    </div>

                </div>
                <div className="row d-flex my-4">
                    <div className="col-12 d-flex">
                        <h4 className='text-white mx-2'>Dia</h4>
                        <input id="day" type="number" className='form-control btn-primary' onChange={filterDate} />
                    </div>
                </div>
            </div>
            :
            <div className="row pb-5 pt-4">
                <form className="d-flex">
                    <input className="form-control" style={{ height: "50px" }} onChange={e => props.setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                </form>
                <div className="col-8 offset-2 d-flex justify-content-center mt-5">
                    <h4 className='text-white mx-2'>Año</h4>
                    <select id="year" className='mx-2 form-select btn-primary' onChange={filterDate}>
                        <option value="">Todos</option>
                        <option value="2022">2022</option>
                    </select>
                    <h4 className='text-white mx-2'>Mes</h4>
                    <select id="month" className='mx-2 form-select btn-primary' onChange={filterDate}>
                        <option value="">Todos</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                    <h4 className='text-white mx-2'>Dia</h4>
                    <input id="day" type="number" className='form-control btn-primary' onChange={filterDate} />
                </div>
            </div>
    )
} 