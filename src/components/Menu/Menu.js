import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Menu.scss'
import Store from "../../stores";

function MenuItem(props) {
    return (
        <Link to={props.to}>{props.text}</Link>
    )
}

class Menu extends React.Component{
    state={
        genres:[]
    }
    componentDidMount() {
        Store.addGenreListener((items)=>{
            this.setState({
                genres:Store.getGenre()
            })
        })

    }
    componentWillUnmount(){
        Store.removeGenreListener()
    }
    CheckGenre = (item) => {
        alert(item)
    }

    render(){
        return (
            <Navbar collapseOnSelect expand="md">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='MenuItems'>
                        <Link to='/'>Top rated</Link>
                        <Link to='/upcoming'>Top rated</Link>
                        <MenuItem text='Popular' href='/popular'/>
                        <MenuItem text='Viewed' href='/viewed'/>
                        <MenuItem text='Planned' href='/planed'/>
                        <NavDropdown title="Genre" id='/collasible-nav-dropdown'>
                            {
                                this.state.genres.map((item) => {
                                    return <NavDropdown.Item key={item.id} href={`/genre/${item.id}`}>{item.name}</NavDropdown.Item>
                                })
                            }
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Menu