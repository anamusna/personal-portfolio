import React from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { P } from "../../tailwind/components/elements/Typography";

const FormPrivacyCaption: React.FC = () => {
  return (
    <P
      size="sm"
      className="text-gray-500 dark:text-gray-400 text-center leading-relaxed"
    >
      <Trans
        i18nKey="forms.privacy.caption"
        components={{
          link: (
            <Link
              to="/privacy"
              className="text-royal-primary dark:text-royal-primary hover:underline font-medium"
            />
          ),
        }}
      />
    </P>
  );
};

export default FormPrivacyCaption;
