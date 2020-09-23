import React, {Fragment, useContext, useEffect} from "react";
import {GithubContext} from "../context/github/githubContext";
import {Link} from "react-router-dom";
import {Repos} from "../components/Repos";

export const Profile = ({match}) => {

    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
    const urlName = match.params.name

    useEffect(() => {
        getUser(urlName)
        getRepos(urlName)
    }, [])

    if (loading) {
        return <p className="text-center">Loading...</p>
    }

    const {
        name, company, avatar_url, location,
        bio, blog, login, html_url, followers,
        following, public_repos, public_gists
    } = user

    return (
        <Fragment>
            <Link to="/" className={"btn btn-link"}>To main</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img src={avatar_url} alt={name} style={{width: '150px'}}/>
                            <h1>{name}</h1>
                            {location && <p>Location: {location}</p>}
                        </div>
                        <div className="col">
                            {
                                bio &&
                                <Fragment>
                                    <h3>BIO</h3>
                                    <p>{bio}</p>
                                </Fragment>
                            }
                            <a href={html_url}
                               target="_blank"
                               className="btn btn-dark"
                               rel="noopener noreferrer"
                            >Open Profile</a>
                            <ul>
                                {
                                    login &&
                                        <li>
                                            <strong>Username: </strong>{login}
                                        </li>
                                }
                                {
                                    company &&
                                    <li>
                                        <strong>Company: </strong>{company}
                                    </li>
                                }
                                {
                                    blog &&
                                    <li>
                                        <strong>Website: </strong>{blog}
                                    </li>
                                }
                            </ul>

                            <div className="badge badge-primary">Followers: {followers}</div>
                            <div className="badge badge-success">Subscribers: {following}</div>
                            <div className="badge badge-info">Repositories: {public_repos}</div>
                            <div className="badge badge-dark">Gists: {public_gists}</div>

                            <Repos repos={repos}/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
