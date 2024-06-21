const { database } = require('../config/firebase');
const { errorHandler, successHandler } = require('../utils/util');

const getUserById = async (req, res) => {
    const { user_id } = req.body;
    if (!user_id) return res.status(400).json(errorHandler('User id is required'));
  
    try {
      const userDoc = await database.collection('users').doc(user_id).get();
      if (!userDoc.exists) return res.status(404).json(errorHandler('User not found'));
  
      const userData = userDoc.data();
  
      const projectsSnapshot = await database.collection('projects').where('user_id', '==', user_id).get();
      const projectsData = projectsSnapshot.docs.map(doc => doc.data());
  
      const workExpSnapshot = await database.collection('workExp').where('user_id', '==', user_id).get();
      const workExpData = workExpSnapshot.docs.map(doc => doc.data());
  
      res.status(200).json(successHandler ({
        user: userData,
        projects: projectsData,
        workExp: workExpData
      }));
    } catch (error) {
        console.log('Disturbed');
      res.status(500).json(errorHandler('Internal Server Error'));
    }
  };

module.exports = { getUserById };
