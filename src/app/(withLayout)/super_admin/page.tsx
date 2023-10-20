"use client";
import ActionBar from "@/components/ui/ActionBar";
import { useGetSingleUserQuery } from "@/redux/api/features/registerApi";
import { getUserInfo } from "@/services/auth.service";

const SuperAdmipage = () => {
  const { id } = getUserInfo() as any;
  const { data, isLoading } = useGetSingleUserQuery(id);
  const user = data?.data;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ActionBar title="Super Admin Profile">
        <div
          style={{
            border: "1px solid green",
          }}
        >
          <div>
            <h1
              style={{
                color: "greenyellow",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {user?.name}
            </h1>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                gap: "50px",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Email{" "}
                  <span style={{ margin: "0px 10px" }}>{user?.email}</span>
                </h3>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Role <span style={{ margin: "0px 10px" }}>{user?.role}</span>
                </h3>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Gender{" "}
                  <span style={{ margin: "0px 10px" }}>{user?.gender}</span>
                </h3>
              </div>
              <div>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Number{" "}
                  <span style={{ margin: "0px 10px" }}>{user?.contactNo}</span>
                </h3>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Birth{" "}
                  <span style={{ margin: "0px 10px" }}>
                    {user?.dateOfBirth}
                  </span>
                </h3>
                <h3
                  style={{
                    color: "greenyellow",
                    fontWeight: "bold",
                    margin: "20px",
                  }}
                >
                  Details{" "}
                  <span style={{ margin: "0px 10px" }}>{user?.details}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </ActionBar>
    </div>
  );
};

export default SuperAdmipage;
