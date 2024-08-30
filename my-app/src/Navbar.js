import { Link } from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const Navigation = ({ web3Handler, account }) => {
    return (
        <Navbar expand="lg" bg="blue-700" variant="dark" className="py-6 px-6 bg-blue-600">
            <Container className="relative flex items-center justify-between">
                <Navbar.Brand className="text-3xl font-bold text-white">
                    DORA POCKET
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="text-white lg:hidden" />
                <Navbar.Collapse id="responsive-navbar-nav" className="lg:flex lg:items-center lg:space-x-6">
                    <Nav className="flex flex-col lg:flex-row lg:space-x-6">
                        <Nav.Link as={Link} to="/" className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/create" className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                            Create
                        </Nav.Link>
                        <Nav.Link as={Link} to="/my-listed-items" className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                            My Listed Items
                        </Nav.Link>
                        <Nav.Link as={Link} to="/my-purchases" className="text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300">
                            My Purchases
                        </Nav.Link>
                    </Nav>
                    <Nav className="ml-auto flex items-center">
                        {account ? (
                            <Nav.Link
                                href={`https://opencampus-codex.blockscout.com/address/${account}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white ml-4 hover:bg-blue-800 rounded-lg transition-colors duration-300">
                                <Button variant="outline-light" className="text-sm px-4 py-2">
                                    {account.slice(0, 5) + '...' + account.slice(38, 42)}
                                </Button>
                            </Nav.Link>
                        ) : (
                            <Button 
                                onClick={web3Handler} 
                                variant="outline-light" 
                                className="text-sm px-4 py-2 ml-4 bg-blue-600 text-white border border-blue-600 rounded-lg hover:bg-blue-700 hover:border-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Connect Wallet
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;
