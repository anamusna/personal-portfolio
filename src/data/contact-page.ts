import i18n from "../i18n";

export type ContactConversationType = {
  id: string;
  title: string;
  description: string;
};

export type ContactExpectation = {
  id: string;
  label: string;
  detail: string;
};

const buildContactPageContent = () => ({
  eyebrow: i18n.t("content.contactPage.eyebrow"),
  title: i18n.t("content.contactPage.title"),
  subtitle: i18n.t("content.contactPage.subtitle"),
  introduction: i18n.t("content.contactPage.introduction"),

  conversationTypesTitle: i18n.t("content.contactPage.conversationTypesTitle"),
  conversationTypes: [
    {
      id: "senior-roles",
      title: i18n.t("content.contactPage.conversationTypes.seniorRoles.title"),
      description: i18n.t(
        "content.contactPage.conversationTypes.seniorRoles.description",
      ),
    },
    {
      id: "architecture",
      title: i18n.t("content.contactPage.conversationTypes.architecture.title"),
      description: i18n.t(
        "content.contactPage.conversationTypes.architecture.description",
      ),
    },
    {
      id: "something-else",
      title: i18n.t(
        "content.contactPage.conversationTypes.somethingElse.title",
      ),
      description: i18n.t(
        "content.contactPage.conversationTypes.somethingElse.description",
      ),
    },
  ] satisfies ContactConversationType[],

  expectationsTitle: i18n.t("content.contactPage.expectationsTitle"),
  expectations: [
    {
      id: "reply-time",
      label: i18n.t("content.contactPage.expectations.replyTime.label"),
      detail: i18n.t("content.contactPage.expectations.replyTime.detail"),
    },
    {
      id: "location",
      label: i18n.t("content.contactPage.expectations.location.label"),
      detail: i18n.t("content.contactPage.expectations.location.detail"),
    },
    {
      id: "remote",
      label: i18n.t("content.contactPage.expectations.remote.label"),
      detail: i18n.t("content.contactPage.expectations.remote.detail"),
    },
    {
      id: "problems",
      label: i18n.t("content.contactPage.expectations.problems.label"),
      detail: i18n.t("content.contactPage.expectations.problems.detail"),
    },
  ] satisfies ContactExpectation[],

  faqTitle: i18n.t("content.contactPage.faqTitle"),
  faqSubtitle: i18n.t("content.contactPage.faqSubtitle"),
  faqLinkLabel: i18n.t("content.contactPage.faqLinkLabel"),
  faqLinkHref: "/faq",

}) as const;

export const contactPageContent = buildContactPageContent();

i18n.on("languageChanged", () => {
  Object.assign(contactPageContent, buildContactPageContent());
});
