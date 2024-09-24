import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useStore } from '../../hooks/stores';
import UserProfileColumn from "../../components/UserProfile/UserProfileColumn";
import MainBody from "../../components/MainBody/MainBody";
import { observer } from "mobx-react";
import LoginPage from "../Auth/LoginPage";

const HomePage = () => {
  const { authStore, projectStore } = useStore();
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await authStore.fetchUserData();
      const token = authStore.token;

      if (token) {
        await projectStore.getAllProjects();
        if (projectStore.projects.length > 0) {
          projectStore.setSelectedProject(projectStore.projects[0]);
        }
      } else {
        setShowLoginModal(true);
      }
    };

    fetchData();
  }, [authStore, projectStore]);


  const closeLoginModal = () => {
    setShowLoginModal(false);
  };


  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      <UserProfileColumn />
      <MainBody />

      {showLoginModal && (
        <div className="modal-overlay"> 
            <LoginPage onClose={closeLoginModal} />
        </div>
      )}

    </div>
  );
};

export default observer(HomePage);
