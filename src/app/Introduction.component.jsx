import React, { Component } from "react";

export default class Introduction extends Component {

  render() {
    return (
      <div>
        <h2  className="ui dividing header">Introduction to Grappa</h2>
        <p>
          Grappa was made to administer the process of accepting theses which
          includes sending emails back and forth and keeping all the documents in check.
          It doesn't do a whole lot but the convenience it provides should make
          everyone's lives easier.
        </p>

        <h2 className="ui dividing header">User roles</h2>

        <h3 className="ui header">Instructor</h3>
        <p>
          The user with the least responsibility. The only duty for instructor is
          to add the theses they are in charge of to Grappa before their deadlines.
          That usually is a week before the actual councilmeeting where those said
          theses are then processed. All other user roles can also be instructors (they
          can add theses to Grappa).
        </p>

        <h3 className="ui header">Professor in charge of the studyfield</h3>
        <p>
          This user has access to every thesis added to their studyfield that
          they can edit and view. Their distinct responsibility compared
          to regular instructors is that when required they have to add their
          review of the theses' graders to Grappa. This only happens when thesis'
          graders doesn't include at least one professor and doctor. Grappa
          reminds this user about the pending evaluation and generates PDF file
          out of it when the thesis is downloaded.
        </p>

        <h3 className="ui header">Print person</h3>
        <p>
          After all the other users have done their job this user has the honor
          of downloading all the otherwise ready theses for the councilmeeting.
          If a thesis isn't complete eg. instructor hasn't added their thesis to
          Grappa or student hasn't added their thesis to eThesis or professor hasn't
          evaluated graders the thesis doesn't appear done and print-person doesn't
          have to do any extra work for finding that out. After print-person downloads
          theses that have only "PrintDone" field missing they are set done and
          are considered finished by Grappa.
        </p>

        <h3 className="ui header">Admin</h3>
        <p>
          This user is in charge of accepting users and creating new councilmeeting
          dates with their own deadlines. Also they can re-send reminder-emails to
          other users. They have access to everything and can also add theses to Grappa
          as an instructor.
        </p>
      </div>
    );
  }
}
