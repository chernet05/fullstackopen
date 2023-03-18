const RenderList = (props) => {
    const { searched, filterValue, filterList, persons, remove } = props;
    if (filterList.length > 0) {
        let ans = filterList.map((x, i) => {
            console.log(x, "filterlist")
            return (<div key={x.id + "div"}>
                <span>{x.name} </span>
                <span>{x.number}</span>
                <button onClick={(e) => {
                    if (window.confirm("Do you really want to delete it?")) {
                        remove(e, x.id, x.name);
                    }
                }}>delete</button>
            </div>)
        })
        return (
            ans
        )
    } else if (searched === 'True' && filterList.length < 1 && filterValue.length > 0) {
        return (<div></div>)
    }

    else if (searched === 'False' || (searched === 'True' && filterValue.length === 0)) {
        return (
            persons.map((x) => {
                return (<div key={x.id}><span key={x.id}>{x.name} </span>       <span key={x.id + "phone"}>{x.number}</span>    <button onClick={(e) => {
                    if (window.confirm("Do you really want to delete it?")) {
                        remove(e, x.id, x.name);
                    }
                }}>delete</button></div>)
            }))
    }
}

export default RenderList