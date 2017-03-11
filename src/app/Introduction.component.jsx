import React, { Component } from "react";

export default class Introduction extends Component {

  render() {
    return (
      <div id="front-page" className="ui center aligned container">
        <div className="ui stripe theming vertical segment grappa-segment">
          <div className="ui stackable very relaxed grid container">
            <div className="center aligned column">
              <h1  className="ui icon header grappa-header">Introduction to Grappa</h1>
              <p>
                Grappa was made to administer the process of accepting theses which
                includes sending emails back and forth and keeping all the documents in check.
                It doesn't do a whole lot but the convenience it provides should make
                everyone's lives easier.
              </p>
              <p>
                It sends email using Gmail as client due to complexity and time required
                for creation of self-hosted email client. Frontend is made with React+Redux and 
                the backend with Node. Also it includes Socket.io-server that broadcasts
                recent changes to connected users. (So if you see something change before 
                your eyes, don't be alarmed!)
              </p>
            </div>
          </div>
        </div>

        <div className="ui stripe theming vertical segment grappa-segment">
          <div className="ui stackable very relaxed grid container">
            <div className="center aligned column">
              
              <h1 className="ui icon header grappa-header">User roles</h1>

              <h3 className="ui horizontal header divider">Student</h3>
              <p>
                As of now students are not required to create an account to Grappa but 
                that might change in the future. Their job is to upload their thesis to 
                eThesis and Grappa which they are reminded about in an email when instructor 
                adds their thesis to Grappa.
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
