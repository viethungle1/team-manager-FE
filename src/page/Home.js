import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export function Home () {
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/players').then((response) => {
            setPlayerList(response.data);
        })
    }, []);
    return(
        <>
            <h1>Danh sách cầu thủ</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Vị trí chơi</th>
                    <th scope="col">Quốc tịch</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {playerList.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}
                        </th>
                        <td><Link to={'/details/'+item.id}>{item.name}</Link></td>
                        <td>{item.positions.map(position => position.name).join(', ')}</td>
                        <td>{item.nation.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}