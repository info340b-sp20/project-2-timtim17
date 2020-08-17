import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function SourceCodeLink({ message='Source Code', showIcon=true, id, className }) {
  return (
    <a href="https://github.com/info340b-sp20/project-2-timtim17" target="_blank"
      rel="noopener noreferrer" id={id} className={className}>
      {showIcon &&<FontAwesomeIcon icon={faGithub} />} { message }
    </a>
  );
}
