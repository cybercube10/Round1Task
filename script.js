//Fetching the JSON data from local file
async function fetchProjectData() {
  try {
   
    
    const response = await fetch('ddugky_project.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
}

function createAssetCard(asset) {
  let content;

  if (asset.asset_content_type === 'video' && asset.asset_content.includes('youtube.com')) {
    
    content = `<iframe src="${asset.asset_content}" frameborder="0" allowfullscreen></iframe>`;
  } else if (asset.asset_content_type === 'article') {
   
    content = `<a href="${asset.asset_content}" target="_blank" class="article-link">Read Article</a>`;
  } else {
    
    content = `<div class="plain-content">${asset.asset_content}</div>`;
  }
  return `
    <div class="asset-card" data-asset-id="${asset.asset_id}">
     <div class="asset-head"> <h3>${asset.asset_title}</h3> 
      </div>
      <p>Description: ${asset.asset_description}</p>
      ${content}
      
    </div>
  `;
}

function createTaskCard(task) {
  return `
      <div class="task-card" data-task-id="${task.task_id}">
          <h2>${task.task_title}</h2>
          <p>${task.task_description}</p>
          <div class="assets-container">
              ${task.assets.map(createAssetCard).join('')}
          </div>
      </div>
  `;
}


function renderProject(project) {
  const container = document.getElementById('project-container');
  container.innerHTML = `
      <h1>${project.title}</h1>
      <div class="tasks-container">
          ${project.tasks.map(createTaskCard).join('')}
      </div>
  `;
}

async function initializeProject() {
  const projectData = await fetchProjectData();
  if (projectData) {
    renderProject(projectData);

    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const assetCard = this.closest('.asset-card');
            assetCard.classList.toggle('expanded');
        });
    });
  }
}

initializeProject();
