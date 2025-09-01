import profilePic from "../../assets/profile.jpg";

const Profile = (props) => {
  return (
    <>
      <div className="profile">
        <img src={profilePic} alt="profile picture" />

        <div className="info">
          <h1>Welcome {props.user ? props.user.username : "Guest"}</h1>
        </div>
      </div>
    </>
  )
}
export default Profile