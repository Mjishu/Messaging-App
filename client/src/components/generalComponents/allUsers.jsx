import styles from "../../styles/generalStyles/allusers.module.css"

function AllUsers(props){
    const styling = {borderBottom: `4px solid ${props.color}`}

    return(
        <div className={styles.content} onClick={() => props.handleClick(props.id)} style={styling}>
            <h5>{props.username}</h5>
        </div>
    )
}

export default AllUsers
