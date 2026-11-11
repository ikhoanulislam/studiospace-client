
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Users,
  CalendarCheck,
  Building2,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ClipboardList,
  MapPin,
  Phone,
  MessageSquare,
} from "lucide-react";

const API_URL = "http://localhost:5002";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface ApplicantUser {
  _id?: string;
  name?: string;
  email?: string;
}

interface HostApplication {
  _id: string;
  userId: ApplicantUser | string | null;
  fullName: string;
  phone: string;
  location: string;
  studioType: string;
  experience: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  adminNote?: string;
  createdAt: string;
}

type DashboardTab = "applications" | "contacts";

export default function AdminDashboard() {
  const router = useRouter();

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [applications, setApplications] = useState<HostApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applicationError, setApplicationError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] =
    useState<DashboardTab>("applications");
  const [adminNotes, setAdminNotes] = useState<
    Record<string, string>
  >({});

  // Load dashboard data using HTTPOnly cookie
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");
    setApplicationError("");

    try {
      const [contactResponse, applicationResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/admin/contacts`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/admin/host-applications`, {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }),
        ]);

      if (
        contactResponse.status === 401 ||
        applicationResponse.status === 401
      ) {
        sessionStorage.removeItem("user");
        router.replace("/login");
        return;
      }

      if (
        contactResponse.status === 403 ||
        applicationResponse.status === 403
      ) {
        setError("Access denied. Admin permission is required.");
        return;
      }

      const [contactResult, applicationResult] =
        await Promise.all([
          contactResponse.json(),
          applicationResponse.json(),
        ]);

      if (!contactResponse.ok || !contactResult.success) {
        setError(
          contactResult.message ||
            "Unable to load contact messages."
        );
      } else {
        setContacts(contactResult.data || []);
      }

      if (
        !applicationResponse.ok ||
        !applicationResult.success
      ) {
        setApplicationError(
          applicationResult.message ||
            "Unable to load host applications."
        );
      } else {
        setApplications(applicationResult.data || []);
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(message);
      setApplicationError(message);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Logout using cookie
  async function handleLogout() {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.replace("/login");
  }

  // Approve or reject host application
  async function updateApplicationStatus(
    applicationId: string,
    status: "approved" | "rejected"
  ) {
    const actionLabel =
      status === "approved" ? "approve" : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabel} this host application?`
    );

    if (!confirmed) return;

    setUpdatingId(applicationId);
    setApplicationError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/host-applications/${applicationId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
            adminNote: adminNotes[applicationId] || "",
          }),
        }
      );

      if (response.status === 401) {
        sessionStorage.removeItem("user");
        router.replace("/login");
        return;
      }

      if (response.status === 403) {
        throw new Error("Admin permission is required.");
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update application."
        );
      }

      setApplications((current) =>
        current.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
                adminNote: adminNotes[applicationId] || "",
              }
            : application
        )
      );
    } catch (err) {
      setApplicationError(
        err instanceof Error
          ? err.message
          : "Unable to update application."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const pendingCount = applications.filter(
    (item) => item.status === "pending"
  ).length;

  const approvedCount = applications.filter(
    (item) => item.status === "approved"
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "rejected"
  ).length;

  function getApplicantEmail(application: HostApplication) {
    if (
      application.userId &&
      typeof application.userId === "object"
    ) {
      return application.userId.email || "";
    }

    return "";
  }

  function getStatusClasses(status: HostApplication["status"]) {
    if (status === "approved") {
      return "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-300";
    }

    if (status === "rejected") {
      return "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300";
    }

    return "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300";
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#171717] transition-colors duration-300 dark:bg-[#11151F] dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-[#E9E2D9] bg-white dark:border-gray-700 dark:bg-[#171E2A]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FCE8E2] text-[#F15A3B]">
              <LayoutDashboard size={23} />
            </div>

            <div>
              <h1 className="text-xl font-bold">StudioSpace</h1>
              <p className="text-xs text-[#88817A] dark:text-gray-400">
                Admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-300 sm:flex">
              <ShieldCheck size={16} />
              Admin Panel
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-[#E9E2D9] px-4 py-2.5 text-sm font-semibold transition hover:bg-[#F7F5F0] dark:border-gray-700 dark:hover:bg-gray-800"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-10">
        {/* Welcome */}
        <div className="mb-9">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F15A3B]">
            ADMINISTRATION
          </p>

          <h2 className="mt-3 font-serif text-4xl font-bold">
            Dashboard Overview
          </h2>

          <p className="mt-3 text-sm text-[#88817A] dark:text-gray-400">
            Manage StudioSpace host applications and contact messages
            from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#88817A] dark:text-gray-400">
                Total Messages
              </p>
              <Mail className="text-[#F15A3B]" size={23} />
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {loading ? "..." : contacts.length}
            </h3>

            <p className="mt-2 text-xs text-[#99918A] dark:text-gray-500">
              Contact form submissions
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#88817A] dark:text-gray-400">
                Pending Hosts
              </p>
              <Clock className="text-amber-500" size={23} />
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {loading ? "..." : pendingCount}
            </h3>

            <p className="mt-2 text-xs text-[#99918A] dark:text-gray-500">
              Waiting for review
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#88817A] dark:text-gray-400">
                Approved Hosts
              </p>
              <CheckCircle2 className="text-green-600" size={23} />
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {loading ? "..." : approvedCount}
            </h3>

            <p className="mt-2 text-xs text-[#99918A] dark:text-gray-500">
              Approved applications
            </p>
          </div>

          <div className="rounded-2xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431]">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#88817A] dark:text-gray-400">
                Rejected
              </p>
              <XCircle className="text-red-500" size={23} />
            </div>

            <h3 className="mt-4 text-3xl font-bold">
              {loading ? "..." : rejectedCount}
            </h3>

            <p className="mt-2 text-xs text-[#99918A] dark:text-gray-500">
              Rejected applications
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("applications")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "applications"
                ? "bg-[#F15A3B] text-white"
                : "border border-[#E9E2D9] bg-white text-[#5F5953] hover:border-[#F15A3B] dark:border-gray-700 dark:bg-[#1C2431] dark:text-gray-300"
            }`}
          >
            <ClipboardList size={17} />
            Host Applications ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab("contacts")}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
              activeTab === "contacts"
                ? "bg-[#F15A3B] text-white"
                : "border border-[#E9E2D9] bg-white text-[#5F5953] hover:border-[#F15A3B] dark:border-gray-700 dark:bg-[#1C2431] dark:text-gray-300"
            }`}
          >
            <Mail size={17} />
            Contact Messages ({contacts.length})
          </button>

          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-[#E9E2D9] bg-white px-5 py-3 text-sm font-semibold transition hover:bg-[#F7F5F0] disabled:opacity-60 dark:border-gray-700 dark:bg-[#1C2431] dark:hover:bg-gray-800"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Host Applications */}
        {activeTab === "applications" ? (
          <section className="rounded-3xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431] md:p-8">
            <div className="mb-7">
              <h3 className="text-2xl font-bold">
                Host Applications
              </h3>

              <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                Review applications and approve or reject host requests.
              </p>
            </div>

            {applicationError && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                <AlertCircle size={19} className="shrink-0" />
                <p>{applicationError}</p>
              </div>
            )}

            {loading ? (
              <div className="py-16 text-center">
                <RefreshCw
                  className="mx-auto animate-spin text-[#F15A3B]"
                  size={30}
                />
                <p className="mt-4 text-sm text-[#88817A] dark:text-gray-400">
                  Loading host applications...
                </p>
              </div>
            ) : applicationError && applications.length === 0 ? (
              <div className="rounded-2xl bg-[#F7F5F0] py-12 text-center dark:bg-[#111827]">
                <AlertCircle
                  size={36}
                  className="mx-auto text-red-400"
                />
                <p className="mt-3 text-sm text-[#88817A] dark:text-gray-400">
                  Could not load applications.
                </p>
              </div>
            ) : applications.length === 0 ? (
              <div className="rounded-2xl bg-[#F7F5F0] py-16 text-center dark:bg-[#111827]">
                <ClipboardList
                  size={40}
                  className="mx-auto text-[#F15A3B]"
                />

                <h4 className="mt-4 text-lg font-bold">
                  No Host Applications Yet
                </h4>

                <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                  New host applications will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {applications.map((application) => (
                  <article
                    key={application._id}
                    className="rounded-2xl border border-[#E9E2D9] p-5 transition hover:border-[#F15A3B] dark:border-gray-700 md:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-bold">
                          {application.fullName}
                        </h4>

                        <p className="mt-1 text-sm text-[#88817A] dark:text-gray-400">
                          {getApplicantEmail(application) ||
                            "Email not available"}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusClasses(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </span>
                    </div>

                    {/* Applicant Information */}
                    <div className="mt-5 grid gap-3 rounded-xl bg-[#F7F5F0] p-4 dark:bg-[#111827] sm:grid-cols-2">
                      <p className="flex items-center gap-2 text-sm text-[#5F5953] dark:text-gray-300">
                        <Phone
                          size={16}
                          className="text-[#F15A3B]"
                        />
                        {application.phone}
                      </p>

                      <p className="flex items-center gap-2 text-sm text-[#5F5953] dark:text-gray-300">
                        <MapPin
                          size={16}
                          className="text-[#F15A3B]"
                        />
                        {application.location}
                      </p>

                      <p className="flex items-center gap-2 text-sm text-[#5F5953] dark:text-gray-300">
                        <Building2
                          size={16}
                          className="text-[#F15A3B]"
                        />
                        {application.studioType}
                      </p>

                      <p className="flex items-center gap-2 text-sm text-[#5F5953] dark:text-gray-300">
                        <Users
                          size={16}
                          className="text-[#F15A3B]"
                        />
                        Experience: {application.experience}
                      </p>
                    </div>

                    {/* Applicant Message */}
                    <div className="mt-4">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <MessageSquare
                          size={16}
                          className="text-[#F15A3B]"
                        />
                        Applicant Message
                      </p>

                      <p className="mt-2 whitespace-pre-wrap rounded-xl border border-[#E9E2D9] p-4 text-sm leading-7 text-[#5F5953] dark:border-gray-700 dark:text-gray-300">
                        {application.message}
                      </p>
                    </div>

                    {/* Submission Date and Admin Note */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#88817A] dark:text-gray-400">
                      <span className="flex items-center gap-2">
                        <Clock size={14} />
                        Submitted:{" "}
                        {new Date(
                          application.createdAt
                        ).toLocaleString()}
                      </span>

                      {application.adminNote && (
                        <span className="max-w-full">
                          Admin note: {application.adminNote}
                        </span>
                      )}
                    </div>

                    {/* Approve / Reject */}
                    {application.status === "pending" && (
                      <div className="mt-5 border-t border-[#E9E2D9] pt-5 dark:border-gray-700">
                        <label
                          htmlFor={`admin-note-${application._id}`}
                          className="mb-2 block text-sm font-semibold"
                        >
                          Admin Note (Optional)
                        </label>

                        <textarea
                          id={`admin-note-${application._id}`}
                          value={adminNotes[application._id] || ""}
                          onChange={(event) =>
                            setAdminNotes((current) => ({
                              ...current,
                              [application._id]: event.target.value,
                            }))
                          }
                          maxLength={1000}
                          rows={2}
                          placeholder="Write a note for this applicant..."
                          className="w-full rounded-xl border border-[#E9E2D9] bg-white px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#F15A3B] dark:border-gray-700 dark:bg-[#111827] dark:text-white dark:placeholder:text-gray-500"
                        />

                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            onClick={() =>
                              updateApplicationStatus(
                                application._id,
                                "approved"
                              )
                            }
                            disabled={
                              updatingId === application._id
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <CheckCircle2 size={17} />
                            {updatingId === application._id
                              ? "Updating..."
                              : "Approve"}
                          </button>

                          <button
                            onClick={() =>
                              updateApplicationStatus(
                                application._id,
                                "rejected"
                              )
                            }
                            disabled={
                              updatingId === application._id
                            }
                            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <XCircle size={17} />
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : (
          /* Contact Messages */
          <section className="rounded-3xl border border-[#E9E2D9] bg-white p-6 dark:border-gray-700 dark:bg-[#1C2431] md:p-8">
            <div className="mb-7">
              <h3 className="text-2xl font-bold">
                Contact Messages
              </h3>

              <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                Messages submitted through the Contact Us page.
              </p>
            </div>

            {error && (
              <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                <AlertCircle size={19} className="shrink-0" />

                <div>
                  <p className="font-semibold">
                    Unable to load messages
                  </p>
                  <p className="mt-1">{error}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="py-16 text-center">
                <RefreshCw
                  className="mx-auto animate-spin text-[#F15A3B]"
                  size={30}
                />

                <p className="mt-4 text-sm text-[#88817A] dark:text-gray-400">
                  Loading messages...
                </p>
              </div>
            ) : !error && contacts.length === 0 ? (
              <div className="rounded-2xl bg-[#F7F5F0] py-16 text-center dark:bg-[#111827]">
                <Mail
                  size={38}
                  className="mx-auto text-[#F15A3B]"
                />

                <h4 className="mt-4 text-lg font-bold">
                  No Messages Yet
                </h4>

                <p className="mt-2 text-sm text-[#88817A] dark:text-gray-400">
                  New contact submissions will appear here.
                </p>
              </div>
            ) : !error ? (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <article
                    key={contact._id}
                    className="rounded-2xl border border-[#E9E2D9] p-5 transition hover:border-[#F15A3B] dark:border-gray-700"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold">
                          {contact.subject}
                        </h4>

                        <p className="mt-2 text-sm font-semibold">
                          {contact.name}
                        </p>

                        <a
                          href={`mailto:${encodeURIComponent(
                            contact.email
                          )}`}
                          className="mt-1 block text-sm text-[#F15A3B] hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-[#88817A] dark:text-gray-400">
                        <Clock size={14} />
                        {new Date(
                          contact.createdAt
                        ).toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-[#F7F5F0] p-4 dark:bg-[#111827]">
                      <p className="whitespace-pre-wrap text-sm leading-7 text-[#5F5953] dark:text-gray-300">
                        {contact.message}
                      </p>
                    </div>

                    <div className="mt-4">
                      <a
                        href={`mailto:${encodeURIComponent(
                          contact.email
                        )}?subject=${encodeURIComponent(
                          `Re: ${contact.subject}`
                        )}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#F15A3B] px-4 py-2 text-sm font-semibold text-[#F15A3B] transition hover:bg-[#F15A3B] hover:text-white"
                      >
                        <Mail size={15} />
                        Reply via Email
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        )}
      </div>
    </main>
  );
}
