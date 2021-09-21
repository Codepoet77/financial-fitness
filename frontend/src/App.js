import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Dashboard from './components/dashboard/list'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { Container, Row, Col, Nav } from 'react-bootstrap'
import Userfront from '@userfront/react'

Userfront.init('pn4vqpny')

const SignupForm = Userfront.build({
  toolId: 'brmnll',
})
const LoginForm = Userfront.build({
  toolId: 'romrlk',
})
const PasswordResetForm = Userfront.build({
  toolId: 'knlarl',
})

const LogoutButton = Userfront.build({
  toolId: 'lkdaok',
})

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Router>
            <Nav variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/reset">Reset Password</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav.Item>
            </Nav>
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/reset">
                <PasswordReset />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </Col>
      </Row>
      <Row>
        <Col>footer</Col>
      </Row>
    </Container>
  )

  function Home() {
    return (
      <div>
        <h2>Home</h2>
        <SignupForm />
      </div>
    )
  }

  function Login() {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm />
      </div>
    )
  }

  function PasswordReset() {
    return (
      <div>
        <h2>Password Reset</h2>
        <PasswordResetForm />
      </div>
    )
  }

  function Dashboard() {
    function renderFn({ location }) {
      // If the user is not logged in, redirect to login
      if (!Userfront.accessToken()) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }

      // If the user is logged in, show the dashboard
      const userData = JSON.stringify(Userfront.user, null, 2)
      return (
        <div>
          <h2>Dashboard</h2>
          <pre>{userData}</pre>
          <LogoutButton></LogoutButton>
        </div>
      )
    }

    return <Route render={renderFn} />
  }
}

export default App
