const { supabase } = require('../config/supabase');
const { errorHandler, successHandler } = require('../utils/util');

const getUserById = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json(errorHandler('User id is required'));

  try {
    const [profileResult, projectsResult, workExpResult] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user_id).single(),
      supabase.from('projects').select('*').eq('user_id', user_id).order('project_order', { ascending: true }),
      supabase.from('work_experiences').select('*').eq('user_id', user_id),
    ]);

    if (profileResult.error || !profileResult.data) {
      return res.status(404).json(errorHandler('User not found'));
    }

    const p = profileResult.data;

    const user = {
      id: p.id,
      first_name: p.first_name,
      last_name: p.last_name,
      email: p.email,
      about: p.about,
      profile_picture: p.profile_picture,
      profession: p.profession,
      showCase: {
        linkedIn: p.showcase_linked_in,
        github: p.showcase_github,
        resume: p.showcase_resume,
        instagram: p.showcase_instagram,
        youtube: p.showcase_youtube,
        coverLetter: p.showcase_cover_letter,
      },
      created_at: p.created_at,
    };

    res.status(200).json(successHandler({
      user,
      projects: projectsResult.data ?? [],
      workExp: workExpResult.data ?? [],
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorHandler('Internal Server Error'));
  }
};

module.exports = { getUserById };
