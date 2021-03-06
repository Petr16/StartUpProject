DECLARE
  v_cur refcursor;
BEGIN
  open v_cur for
    select r.id, r.name
    from "CustomerManagerSchema".requests r
    order by r.name;

  return v_cur;
EXCEPTION
WHEN OTHERS THEN
  NULL;
END;