import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }){
    
    const [github_username, setarGithubUsername] = useState('');
    const [techs, setarTechs] = useState('');
    const [latitude, setarLatitude] = useState('');
    const [longitude, setarLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setarLatitude(latitude);
            setarLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        )
      }, []);

      async function handleSubmit(e){
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
          });
          setarGithubUsername('');
          setarTechs('');
      }

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e=>setarGithubUsername(e.target.value)}></input>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs} onChange={e=>setarTechs(e.target.value)}></input>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e=>setarLatitude(e.target.value)}></input>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e=>setarLongitude(e.target.value)}></input>
            </div>            
          </div>
          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;