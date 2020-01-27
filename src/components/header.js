import React, { useContext } from "react"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import { FirebaseContext } from "./Firebase"
import styled from "styled-components"

const LogoutLink = styled.span`
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const HeaderContent = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  color: white;

  > h1 {
    margin: 0;
    flex-grow: 1;

    > a {
      color: white;
      text-decoration: none;
    }
  }

  > div {
    margin: auto 0;
  }
`

const LoginLink = styled.div`
  > a {
    color: white;
    text-decoration: none;
  }
`

const UserInfo = styled.div`
  text-align: right;
`

const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;
`

const AdminLink = styled.span`
  a {
    color: white;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export default function Header({ siteTitle }) {
  const { firebase, user } = useContext(FirebaseContext)

  function handleLogoutClick(event) {
    firebase.logout().then(() => navigate("/login"))
  }

  return (
    <HeaderWrapper>
      <HeaderContent>
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
        <div>
          {!!user && !!user.email && (
            <UserInfo>
              Hello, {user.username || user.email}
              <div>
                {!!user.isAdmin && (
                  <>
                    <AdminLink>
                      <Link to="/add-author">Add author</Link>
                    </AdminLink>
                    <Divider />
                    <AdminLink>
                      <Link to="/add-book">Add book</Link>
                    </AdminLink>
                    <Divider />
                  </>
                )}
                <LogoutLink onClick={handleLogoutClick}>Logout</LogoutLink>
              </div>
            </UserInfo>
          )}
          {(!user || !user.email) && (
            <LoginLink>
              <Link to="/login">Login</Link>
              <Divider />
              <Link to="/register">Register</Link>
            </LoginLink>
          )}
        </div>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}
