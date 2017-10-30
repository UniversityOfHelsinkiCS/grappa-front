import React, { Component } from "react";

export default class Introduction extends Component {

  render() {
    return (
      <div id="front-page" className="ui center aligned container">
        <div className="ui stripe theming vertical segment grappa-segment">
          <div className="ui stackable very relaxed grid container">
            <div className="center aligned column">
              <h2>Maintenances between 2.11-6.11</h2>
              <p>
                Grappa will have maintenances between thursday 2.11 and monday 6.11 and might
                have downtime of minutes to hours.
                If you have any issues with the website you should restart browser after monday.
                
              </p>
              <hr/>
              <h1  className="ui icon header grappa-header">Introduction to Grappa</h1>
              <p>
                Grappa was made for the University of Helsinki's department of Computer Science 
                to administer the process of accepting theses which includes sending emails back 
                and forth and keeping all the documents in check.
                Its purpose is to easen and simplify the process and make it easier for 
                everyone involved.
              </p>
            </div>
          </div>
        </div>

        <div className="ui stripe theming vertical segment grappa-segment">
          <div className="ui stackable very relaxed grid container">
            <div className="center aligned column">
              
              <h1 className="ui icon header grappa-header">User roles</h1>
              <p>
                There are multitude of different user groups that have to access Grappa 
                whose primary duties are listed here.
              </p>

              <h3 className="ui horizontal header divider">Instructor</h3>
              <p>
                The only responsibility for instructor is 
                to add the theses they are in charge of to Grappa before their deadlines.
                That usually is a week before the actual councilmeeting where those said
                theses are then processed. Professors and admins can also be instructors 
                (they can add theses to Grappa).
              </p>

              <h3 className="ui horizontal header divider">Professor in charge of the studyfield</h3>
              <p>
                This user is able to view all the theses that have been added to their 
                studyfield. Their distinct responsibility compared
                to regular instructors is that when required they have to add their
                review of thesis' graders to Grappa. This only happens when thesis'
                graders doesn't include at least a one professor and a doctor. Grappa
                reminds this user about the pending evaluation and generates PDF file
                out of it when the thesis is downloaded.
              </p>

              <h3 className="ui horizontal header divider">Print person</h3>
              <p>
                After all the other users have done their job this user has the privilege
                of downloading all the otherwise ready theses for the councilmeeting.
                If a thesis isn't complete eg. instructor hasn't added it to
                Grappa, student hasn't uploaded their abstract or professor hasn't
                evaluated the graders the thesis doesn't appear done and print-person doesn't
                have to do any extra work for finding that out. After print-person downloads
                the theses that have only "PrintDone" field missing they are set done and
                are considered finished by Grappa.
              </p>

              <h3 className="ui horizontal header divider">Admin</h3>
              <p>
                This user is in charge of accepting users and creating new councilmeeting
                dates with their own deadlines. Also they can re-send reminder-emails to
                other users. They have access to everything and can also add theses to Grappa
                as an instructor.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
