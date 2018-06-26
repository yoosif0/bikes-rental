// import React from 'react'
// import PropTypes from 'prop-types'

// class Navbar{
//     render() {
//         <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
//     <a class="navbar-brand" Link="/">CalTrack ©</a>
//     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
//         aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//     </button>
//     {authService.isAuthenticated() ? (
//                 <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                 <ul class="navbar-nav mr-auto" >
//                     <li class="nav-item">
//                         <a id="myRecordsTab"  Link='/my-meals' class="nav-link">My meals </a>
//                     </li>
//                     <li class="nav-item">
//                         <a id="myProfileTab" Link='/my-profile' class="nav-link">My profile</a>
//                     </li>
        
//     )

//             <li *ngIf="authService.isAtleastManager()" class="nav-item">
//                 <a id="usersTab" Link='/users' class="nav-link">Users</a>
//             </li>
//             <li *ngIf="authService.isAdmin()" class="nav-item">
//                 <a id="inviteUserTab" Link='/invite' class="nav-link">Invite a User</a>
//             </li>
//             <li class="nav-item">
//                 <a id="myLoginsTab" Link='/my-logins' class="nav-link">My logins</a>
//             </li>
//         </ul>
//         <app-progress-bar *ngIf="authService.getProfile().isTrackingDisplayed"></app-progress-bar>
//         <ul class="navbar-nav ml-auto mr-5" >
//             <li class="nav-item">
//                 <a class="nav-link link" href="javascript:void(0);" (click)="logout()">Logout</a>
//             </li>
//         </ul>
//     </div>
//     ) 

// </nav>
//     }
// } 

// = ({ onClick, completed, text }) => (
//     <li
//         onClick={onClick}
//         style={{
//             textDecoration: completed ? 'line-through' : 'none'
//         }}
//     >
//         {text}
//     </li>
// )

// Todo.propTypes = {
//     onClick: PropTypes.func.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
// }

// export default Todo
